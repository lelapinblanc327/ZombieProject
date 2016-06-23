using UnityEngine;
using System.Collections;

public class FPSAnimation_Final : MonoBehaviour {
	public Animator thisAnimator;
	public GameObject bulletPrefab;
	public Transform muzzle;
	public float horizontalSpeed;
	public float itemWeight;

	void Start () 
	{
		thisAnimator = GetComponent<Animator>();
	}
	
	void Update () 
	{
		horizontalSpeed = Input.GetAxis ("Horizontal");
		thisAnimator.SetFloat("HSpeed", horizontalSpeed);

		if(Input.GetButtonDown ("Fire1"))
		{
			thisAnimator.SetTrigger ("Shooting");
			Shoots();
		}
	}
	void Pick(float objectWeight)
	{
		thisAnimator.SetTrigger ("Picking");
		itemWeight = objectWeight;
		thisAnimator.SetFloat ("Weighting", objectWeight);
	}

	void Shoots()
	{
		Debug.Log ("You Fired");
		GameObject theBullet;
		theBullet = Instantiate (bulletPrefab, muzzle.position, muzzle.rotation)as GameObject;
		theBullet.GetComponent<Rigidbody>().AddRelativeForce(0, 0, 3000f);
	}
}
