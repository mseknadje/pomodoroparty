import static org.junit.Assert.assertEquals;
import io.github.bonigarcia.wdm.WebDriverManager;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import org.openqa.selenium.By;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.firefox.FirefoxDriver;
import org.openqa.selenium.firefox.FirefoxOptions;
import org.openqa.selenium.remote.RemoteWebDriver;
import java.time.Duration;
import java.util.List;

public class TestBackend{
    private RemoteWebDriver driver = null;
    private String loginPath = "http://localhost:3000/";
    private String registerPath = "http://localhost:3000/Register";

    /**
     * Set up for a new test
     */
    @Before
    public void setup() {
        WebDriverManager.firefoxdriver().setup();
        FirefoxOptions options = new FirefoxOptions();
        options.addArguments("--headless");
        this.driver = new FirefoxDriver(options);
        driver.manage().timeouts().implicitlyWait(Duration.ofMillis(500));
    }

    /**
     * Reset to old state
     */
    @After
    public void tearDown() {
        driver.quit();
    }

    /**
     * Test that registration is successful (user can be made and stored) and a
     * that they can login after registering. Does this by checking that after 
     * we attempt to login, we are redirected to the dashboard. 
     */
    @Test
    public void testLogin() {
      driver.get(registerPath);

      WebElement registerContainer = driver.findElement(By.className("register__container");
      List<WebElement> inputs = register__container.findElements(By.tagName("input"));
      WebElement registerButton = newRound.findElement(By.tagName("button"));

      // Enter registration information
      inputs.get(0).sendKeys("Full Name");
      inputs.get(1).sendKeys("abc@gmail.com"); 
      inputs.get(2).sendKeys("your_password");
      registerButton.click();

      driver.get(loginPath);
      WebElement loginContainer = driver.findElement(By.className("login__container");
      List<WebElement> loginInputs = login__container.findElements(By.tagName("input"));
      WebElement loginButton = loginContainer.findElement(By.tagName("button"));

      // Enter login information
      inputs.get(0).sendKeys("Full Name");
      inputs.get(1).sendKeys("your_password");
      loginButton.click();

      //Should redirect to the dashboard
      String actualUrl = driver.getCurrentUrl();
      String expectedUrl = "http://localhost:3000/dashboard";
      Assert.assertEquals(expectedUrl,actualUrl);
    }

}